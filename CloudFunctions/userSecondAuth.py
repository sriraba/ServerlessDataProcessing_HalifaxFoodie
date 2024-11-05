# Title: Save Second Factor Details To Firestore
# Author: Sri Ramya Basam
# Date: 2022/11/09
# Availability: https://firebase.google.com/docs/firestore/quickstart
from google.cloud import firestore
import json

#code to save second factor auth details to firestore
def hello_world(request):
    request_json = request.get_json()
    response = {"headers":{"Access-Control-Allow-Origin":"*"},
                "body":{"message":"Data loaded to gcp"}}
    response_json = json.dumps(response)
    print(request_json)
    print("my gcp function is called!!!!!!!")
    values = []
    for k,v in request_json.items():
        print("key",k)
        print("value",v)
        values.append(v)
    print(values)
    update_create_if_missing(values)
    response_json={}
    response_json['message']="Data loaded to gcp"
    response_json['statusCode']=200
    response_json['headers']={}
    response_json['Access-Control-Allow-Origin']="*"
    response_json['headers']['ContentType']="application/json"
    if request.method == 'OPTIONS':
        headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)
    return response


def update_create_if_missing(values):
    db = firestore.Client()
    # [START firestore_data_set_doc_upsert]
    city_ref = db.collection(u'usersSecondFactorLookup').document(values[0])

    city_ref.set({        
        u'question' : values[1],
        u'answer' : values[2]
    }, merge=True)
    # [END firestore_data_set_doc_upsert]

