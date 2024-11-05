# Title: Lex Bot Validations And Intent Responses
# Author: Sri Ramya Basam and Sagarkumar Pankajbhai Vaghasia
# Date: 2022/11/22
# Availability: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html

import os
from google.cloud import pubsub_v1
import json
from google.auth import jwt
import json
import boto3
from boto3.dynamodb.conditions import Key
import uuid
client = boto3.resource("dynamodb")


print(jwt.__file__)

def publish(cname, cemail, rname, remail, complaint, id):
    
    service_account_info = {
        "type": "service_account",
        "project_id": "csci5410-sriramya",
        "private_key_id": "a4b250ca25c757fc974b38dd4457f7c2690f56dd",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDUkMOtMPTl56Cc\n9H36FUUCthMrTNEE8r70qLVsjIxd/PZcT8RQdLUBi3Mr4YhUjulG+tTrqA98AiBo\niKJk1oMeJdsXsWiG2cuPBsorDBsMIEOr34Cz6VsrSQww77QJyIqRzi6KUPh/h5kA\nk0qSO9QkpKxdihNHJLVv2qKfDT3RUPu85Z2XAmtbp8rB2r+y4Vkp9a1B7FUcyUPf\nHLCa55E0nPucST8a0ZhleEHPMkIyGZ9enJan23Vz0yPjz8dvEiBoRc3MG42pGXWQ\n1+TK56LOUtNw8TPq3mJDGZDRsok2376wi0CRkYQ1rT2iavkgfV1Yfd6EZdcKcXsb\ndPh0bqd3AgMBAAECggEABsncxfIzUAhWs8yHHW6CdrSz5gUdA8hw2sVsjdvrO7Ex\neP8/KMahZTw74GHihbjOsGqgVCpY3EABIvWCIjBLnbHdzmLnEK9x9c5ktH09e+Sn\n5JxNsvE37Sj3D7UIDevuqPtptxcg6Im/FCqgDg2FF+p+arpXJUWB2eGkoem9WKrr\nhpedHxleQcadu7tOdjIt0+413jjtgIXrJ5e7aRqUeHkLPRPZRC2luOLQlvhKQwzc\nuectggiF/0RLKDDvrsizd+EGEVN1GdZbFgfWveAm8j7W8RJmwnybT/SKctC0jAsF\nOfFbQSRBu0bZruDKsMZWThI0CNGTNPkSGlpWFVmUmQKBgQDxa2pmnv3PPoGvQvoz\n11qFWXBZRMKCFHpHlSuFm1P8REpWtwD/qshD25eImsr/tDQIajMiGPlue1DTuBhR\nLsQfNwjF9etAjwhXr/FqlCZLR/jP73Plqu6n3DODrgK4bTQ9lJukI78xpNYNXEDn\nrskvJrKjCfyn+N4Yd34nI6trgwKBgQDhZzxhkZUjvaNqWDi1v85BRVMVET9iknhd\n1OcjUA8rYGuhlA5aGTSEyWok/QKwxqhWpaeKLn8x7ZZxYWaBqRRdWFF2m+dZyUjm\ni8euuIqwpFgn9zwC60BbS+KzEulCFHSs5sf1KrtX4dzR4c9ddAY+C5H6KR7v424S\nG2jhvmVN/QKBgGO25zq9vr2j5rK6KlfRQk1D1Ni6QtCxnpQEc/Z6YqUWm9HXQq1X\nH+KPR7afoOsexkMXgkk6IYRVoNvh9QFLHKx78b66RVHkAiEdxcwspuh/MLDKCYe6\nI1rn48smy27bhDFPOT4Bmc3qdJMOIKzRD73O8QfQby/95dYbPNrzq7D7AoGAUV7+\nek6fI47zbpG4r0w1/nQzYRif5EryLxWL98CQKV2enW8gm0AcKI+5xO6dyQl+fgFB\ncW4FtxWJSRcbdVV/p48ZoZL4uv4iVjBB/v5Z+xjpRkxHmtoomozTo0gBczyFPmH1\n77jkdv5vxEkbniYjlsSAh2nO5FUbSGgivdQJKFUCgYBmO8Eg3MpNiw5FMO6PIzdp\nXA7bX1j7hGciLSQBTGqzkY83rvWJe5/cXfLlB2HEgOMKDne4ksB2W7gjANnKCo5a\nGbBE8lWRfMYWYMN+zsgGCNO0dYGxk6l/cWAVjFu5RClLnutoetfowiJWIl6ZoNqq\nVDnW+pdZqN5eoBePA6a6ug==\n-----END PRIVATE KEY-----\n",
        "client_email": "pubsub-service-account@csci5410-sriramya.iam.gserviceaccount.com",
        "client_id": "101028172057353629706",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/pubsub-service-account%40csci5410-sriramya.iam.gserviceaccount.com"
    }
    
    audience = "https://pubsub.googleapis.com/google.pubsub.v1.Subscriber"

    credentials = jwt.Credentials.from_service_account_info(
        service_account_info, audience=audience
    )

    subscriber = pubsub_v1.SubscriberClient(credentials=credentials)

    # The same for the publisher, except that the "audience" claim needs to be adjusted
    publisher_audience = "https://pubsub.googleapis.com/google.pubsub.v1.Publisher"
    credentials_pub = credentials.with_claims(audience=publisher_audience)

    publisher = pubsub_v1.PublisherClient(credentials=credentials_pub)
    # topic_name = 'projects/{project_id}/topics/{topic}'.format(
    #     project_id=os.getenv('GOOGLE_CLOUD_PROJECT'),
    #     topic='MY_TOPIC_NAME',  # Set this to something appropriate.
    # )
    
    topic_name = "projects/csci5410-sriramya/topics/customer_complaints"
    # publisher.create_topic(name=topic_name)
    
    message = {
      "cname": cname,
      "cemail": cemail,
      "rname": rname,
      "remail": remail,
      "complaint": complaint,
      "id": id
    }
    
    str_message = json.dumps(message)
    
    print(str_message)
    
    byte_message = bytes(str_message, "utf-8")
    
    
    future = publisher.publish(topic_name, byte_message, spam='eggs')
    future.result()



def lambda_handler(event, context):
    # TODO implement
    print('printing event ....')
    print(event)
    intent = event['sessionState']['intent']['name']
    if(intent == 'OrderRating'):
      return rateOrder(event)
    elif(intent == 'OrderTracking'):
      print('the intent is : ',intent)
      return trackOrder(event)
    elif(intent == 'AddRecipes'):
      print('the intent is : ',intent)
      return addRecipe(event)
      
    elif(intent == 'OrderComplaints'):
      print('the intent is : ',intent)
      return raiseComplaint(event)
            
    print('the intent is : ',intent)
    username=getslot(event, 'username')
    print('username is : ',username)

    print('fetching student details')
    table = client.Table("halifaxFoodieUserLookup")
    response = table.get_item(
    Key={
        'username': username
    }
    )
    if('Item' in response and response['Item']['usertype'] == 'owner'):
        print(response['Item']['username'])
        return {
        "sessionState": {
		    "dialogAction": {
			"type": "Close"
			},
			"intent": {
				"name": intent,
					"state": "Fulfilled"
			}
			},
			"messages": [
			{
				"contentType": "PlainText",
				"content": "You are verified"
			},
			  {
				 "contentType":"ImageResponseCard",
				 "imageResponseCard":{
					"buttons":[
					   {
						  "text":"Add Recipe",
						  "value":"add recipe"
					   }
					],
					"title":"Please select below"
				 }
			  }
		]	
    }  
    elif('Item' in response):
      return  {
        "sessionState": {
		    "dialogAction": {
			"type": "Close"
			},
			"intent": {
				"name": intent,
					"state": "Fulfilled"
			}
			},
			"messages": [
			{
				"contentType": "PlainText",
				"content": "You are verified"
			},
			  {
				 "contentType":"ImageResponseCard",
				 "imageResponseCard":{
					"buttons":[
					   {
						  "text":"Order Tracking",
						  "value":"tracking"
					   },
					   {
						  "text":"Order Rating",
						  "value":"rating"
					   },
					   {
						  "text":"Complaints",
						  "value":"complaint"
					   }
					],
					"title":"Please select below"
				 }
			  }
		]	
    } 
    else:
      return  {
        "sessionState": {
		    "dialogAction": {
			"type": "Close"
			},
			"intent": {
				"name": intent,
					"state": "Failed"
			}
			},
			"messages": [
			{
				"contentType": "PlainText",
				"content": "You are not a valid user"
			}
		]	
    }
      
        
def getslots(event):
    return event['sessionState']['intent']['slots']
    
# code to save order rating
def rateOrder(event):
    table = client.Table("orderDetails")
    orderid=getslot(event, 'orderid')
    rating=getslot(event, 'rating')
    feedback=getslot(event, 'feedback')
    print('fetching student details')
    table = client.Table("orderDetails")
    client_details = boto3.resource('dynamodb')
    orderDetails = client_details.Table("orderDetails")
    response = table.get_item(
        Key={
            'orderid': orderid
            })
    if ('Item' in response):
        item = response['Item']
        item['rating'] = rating
        item['feedback'] = feedback
        table.put_item(Item=item)

        return {"sessionState": {
            "dialogAction": {
            "type": "Close"
            },
            "intent": {
            "name": "OrderRating",
            "state": "Fulfilled"
            }}}
    
    else:
        return {
        "sessionState": {
        "dialogAction": {
            "type": "Close"
        },
        "intent": {
            "name": "OrderRating",
            "state": "Failed"
        }
        }
        }
def getslot(event, slotName):
    slots = getslots(event)
    if slots is not None and slotName in slots and slots[slotName] is not None:
        return slots[slotName]['value']['interpretedValue']
    else:
        return None
        
 #code to validate orderid and track orders       
def trackOrder(event):
  table = client.Table("orderDetails")
  orderid=getslot(event, 'orderid')
  print('fetching order details')
  table = client.Table("orderDetails")
  response = table.get_item(
  Key={
      'orderid': orderid
  })
  
  if ('Item' in response):
    print(response['Item']['orderStatus'])
    return {
        "sessionState": {
		    "dialogAction": {
			"type": "Close"
			},
			"intent": {
				"name": "OrderTracking",
					"state": "Fulfilled"
			}
			},
			"messages": [
			{
				"contentType": "PlainText",
				"content": "your order is in "+response['Item']['orderStatus']+ "status"
			}
		]	
    } 
  else:
    print('in else block of order tracking')
    return {
        "sessionState": {
		    "dialogAction": {
			"type": "Close"
			},
			"intent": {
				"name": "OrderTracking",
					"state": "Failed"
			}
			},
			"messages": [
			{
				"contentType": "PlainText",
				"content": "Orderid entered is not valid. Please type 'ok' to retry or 'no' to exit."
			}
		]	
    } 
      
      
 # code to raise complaints     
def raiseComplaint(event):
    client_details = boto3.resource('dynamodb')
    orderDetails = client_details.Table("orderDetails")
    Complaint=getslot(event, 'USER_complaint')
    ORDER_ID=getslot(event, 'ORDER_ID')
    userName=getslot(event, 'USER_name')
    print("Complaint===>",Complaint)
    print("userName===>",userName)
    print("ORDER_ID===>",ORDER_ID)
    print('Raising Complaint ...')

    response = orderDetails.get_item(Key={'orderid': ORDER_ID})
    item = response['Item']
    # update
    item['USER_complaint'] = Complaint
	# put (idempotent)

    orderDetails.put_item(Item=item)
    # orderDetails.put_item(Item=item)


    c = boto3.resource('dynamodb').Table("halifaxFoodieUserLookup")
    user = c.get_item(Key={'username': item["USER_name"]})
    restaurant = c.get_item(Key={'username': item["RESID"]})
    print(user)
    print(item)
    
    id = uuid.uuid4().hex
    publish(item["USER_name"], user["Item"]["email"], item["RESID"], restaurant["Item"]["email"], Complaint, id)
    return {"sessionState": {
    "dialogAction": {
        "type": "Close"
    },
    "intent": {
        "name": "OrderComplaints",
        "state": "Fulfilled"
    }},
    "message": {
      "contentType": "PlainText",
      "content": "http://localhost:3000/chat/" + id
    }
    }

# code to save receipies	
def addRecipe(event):

  recipename=getslot(event, 'recipename')
  price=getslot(event, 'price')
  restaurantname=getslot(event, 'restaurantname')
  print('Adding recipe details')
  client_details = boto3.resource('dynamodb')
  addRecipes = client_details.Table("addRecipes")
  recipeResponse = addRecipes.put_item(
    Item = { 'recipeName':recipename,
        'price' : price,
        'restaurantName' : restaurantname }
    )
  message = "Your recipe has been uploaded successfully. Thanks for connecting with us today."
  return {
        "sessionState": {
		    "dialogAction": {
			"type": "Close"
			},
			"intent": {
				"name": "AddRecipes",
					"state": "Fulfilled"
			}
			},
			"messages": [
			{
				"contentType": "PlainText",
				"content": message
			}
		]	
    }
  