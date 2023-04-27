from flask import Flask, request, Response, jsonify
from flask_pymongo import PyMongo
from datetime import datetime
from datetime import timedelta
from datetime import timezone
import uuid
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity, get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/chat_socket_app"
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

app.config["JWT_SECRET_KEY"] = "super-secret1234"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
CORS(app)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response


@app.route("/")
def hello():
    return "Hello World!"


@app.post("/login")
def login():
    data = request.get_json()
    found_user = mongo.db.users.find_one(
         {"email": data["email"]}
    )

    if found_user:
        if bcrypt.check_password_hash(found_user["password"], data["password"]):

            payload = {"email": found_user["email"]}

            access_token = create_access_token(
                identity=found_user["email"], additional_claims=payload
            )
            response = jsonify({
                "success": True,
                "message": "User logged In successfully",
                "access_token": access_token,
                "user": {
                    "firstName": found_user["firstName"],
                    "lastName": found_user["lastName"],
                    "email": found_user["email"],
                    "number": found_user["number"],

                }
            })
            # set_access_cookies(response, access_token)
            return response
        else:
            return {"success": False, "message": "Incorrect password"}
    else:
        return {"success": False, "message": "User not found"}


@app.post("/signup")
def signup():
    data = request.get_json()
    # print(data)
    data["_id"] = str(uuid.uuid4())
    pw_hash = bcrypt.generate_password_hash(data["password"])
    data["password"] = pw_hash

    found_user = mongo.db.users.find_one(
         {"email": data["email"]}
    )

    if not found_user:
        # print("user not found, creating new user")
        mongo.db.users.insert_one(data)
        return {"success": True, "message": "Signed up successfully"}, 201
    else:
        return {"success": False, "message": "User already exists"}
    

@app.route("/logout", methods=["POST"])
@jwt_required
def logout():
    response = {"msg": "logout successful"}
    unset_jwt_cookies(response)
    return response


@app.post("/protected_route")
@jwt_required()
def protected_route():
    email = get_jwt_identity()
    jwt_payload = get_jwt()
    print(jwt_payload)
    email = jwt_payload["email"]

    return "This is protected route and loggedIn as " + email

@app.get('/get_user_details')
@jwt_required()
def get_user_details():
    email = get_jwt_identity()
    user = mongo.db.users.find_one({"email": email})
    del user["password"]
    print(user)
    return {
        "success": True,
        "user": user
    }

@app.post('/user/set_monthly_budget')
@jwt_required()
def set_monthly_budget():
    email = get_jwt_identity()
    monthly_budget = request.json.get('monthly_budget', None)
    if monthly_budget:
        mongo.db.users.update_one({"email": email}, {"$set": {"monthlyBudget": monthly_budget}})
        return {
            "success": True,
            "message": "Monthly budget set successfully",
            "monthlyBudget": monthly_budget
            
        }
    
    else :
        return {
            "success": False,
            "message": "Please add budget details",
        }
    
@app.get('/user/get_monthly_budget')
@jwt_required()
def get_monthly_budget():
    email = get_jwt_identity()
    user = mongo.db.users.find_one({"email": email})
    return {
        "success": True,
        "data": {
            "monthlyBudget": user["monthlyBudget"]
        }
    }

@app.get('/user/get_yearly_budget')
@jwt_required()
def get_yearly_budget():
    email = get_jwt_identity()
    user = mongo.db.users.find_one({"email": email})
    return {
        "success": True,
        "data": {
            "yearlyBudget": user["yearlyBudget"]
        }
    }
    
@app.post('/user/set_yearly_budget')
@jwt_required()
def set_yearly_budget():
    email = get_jwt_identity()
    yearly_budget = request.json.get('yearly_budget', None)
    if yearly_budget:
        mongo.db.users.update_one({"email": email}, {"$set": {"yearlyBudget": yearly_budget}})
        return {
            "success": True,
            "message": "Yearly budget set successfully",
            "data": {
                "yearlyBudget": yearly_budget
            }
        }
    
    else :
        return {
            "success": False,
            "message": "Please add budget details",
        }

@app.post('/expense/add')
@jwt_required()
def add_expense():
    email = get_jwt_identity()
    title = request.json.get('title', None)
    amount = request.json.get('amount', None)
    category = request.json.get('category', None)
    if title and amount :
        expense = {
            "_id": str(uuid.uuid4()),
            "createdBy": email,
            "title": title,
            "amount": float(amount),
            "category": category,
            "createdAt": datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        }
        mongo.db.expenses.insert_one(expense)
        return {
            "success": True,
            "message": "Expense added successfully",
            "expense": expense
        }
    else : 
        return {
            "success": False,
            "message": "Please add expense details",
        }


@app.get('/expense/get_all')
@jwt_required()
def get_all_expenses():
    email = get_jwt_identity()
    expenses = list(mongo.db.expenses.find({"createdBy": email}))
    # print(expenses)
    total_amount  = 0
    for expense in expenses:
        total_amount = total_amount + expense["amount"]
    return {
        "success": True,
        "expenses": expenses,
        "total_amount": total_amount,
        "message": "Total expenses fetched successfully"
    }

@app.post('/expense/get_all_by_category')
@jwt_required()
def get_all_expenses_by_category():
    email = get_jwt_identity()
    categories = request.json.get('categories', None)
    expenses = list(mongo.db.expenses.find({"category": {"$in": categories},"createdBy": email }))
    # print(expenses)
    total_amount  = 0
    for expense in expenses:
        total_amount = total_amount + expense["amount"]
    return {
        "success": True,
        "expenses": expenses,
        "total_amount": total_amount,
        "message": "Total expenses fetched successfully"
    }

@app.post('/expense/get_all_by_price')
@jwt_required()
def get_all_expenses_by_price():
    email = get_jwt_identity()
    min = request.json.get('min', None)
    max = request.json.get('max', None)
    expenses = list(mongo.db.expenses.find({"amount": {"$gte": float(min), "$lte": float(max)},"createdBy": email }))
    # print(expenses)
    total_amount  = 0
    for expense in expenses:
        total_amount = total_amount + expense["amount"]
    return {
        "success": True,
        "expenses": expenses,
        "total_amount": total_amount,
        "message": "Total expenses fetched successfully"
    }

@app.get('/expense/get/<_id>')
@jwt_required()
def get_expense(_id):
    expense = mongo.db.expenses.find_one({"_id": _id})
    if expense:
        return {
            "success": True,
            "expense": expense,
            "message": "Expense fetched successfully"
        }
    else:
        return {
            "success": False,
            "message": "Expense not found"
        }
    
@app.put('/expense/update/<_id>')
@jwt_required()
def update_expense(_id):
    email = get_jwt_identity()
    title = request.json.get('title', None)
    amount = request.json.get('amount', None)
    updatedAt = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    if title and amount :
        expense = {
            "title": title,
            "amount": float(amount),
            "updatedAt": updatedAt
        }
        done = mongo.db.expenses.update_one({"_id": _id, "createdBy": email}, {"$set": expense})
        expense["_id"] = _id
        if done.modified_count:
            return {
                "success": True,
                "message": "Expense updated successfully",
                "expense": expense
            }
        else:
            return {
                "success": False,
                "message": "Expense not found"
            }
    else : 
        return {
            "success": False,
            "message": "Please add expense details",
        }
    


@app.delete('/expense/delete/<_id>')
@jwt_required()
def delete_expense(_id):
    done = mongo.db.expenses.delete_one({"_id": _id})
    print(done)
    print(done.deleted_count)
    if done.deleted_count:
        return {
            "_id": _id,
            "success": True,
            "message": "Expense deleted successfully"
        }
    else:
        return {
            "success": False,
            "message": "Expense not found"
        }



    

if __name__ == "__main__":
    app.run(debug=True)
