# Title: Cipher Key Validation
# Author: Sri Ramya Basam
# Date: 2022/11/09
# Availability: https://www.geeksforgeeks.org/columnar-transposition-cipher/

import json
import math
import boto3
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    # TODO implement
    print(event)
    request_json = json.loads(event['body'])
    
    print(request_json)
    client = boto3.resource("dynamodb")
    table = client.Table("userCipherInfo")
    usertable = client.Table("halifaxFoodieUserLookup")
    response = table.get_item(
    Key={
        'username': request_json['body']['username']
    }
    )
    userresponse = usertable.get_item(
    Key={
        'username': request_json['body']['username']
    }
    )
    print(response)
    usertype = userresponse['Item']['usertype']
    cipherText = encryptText(response['Item']['plaintext'], response['Item']['key'])
    print(cipherText)
    funcresponse = {"body":{"message":"invalid code","status":"fail","usertype":usertype}}
    if cipherText == request_json['body']['code']:
        funcresponse = {"body":{"message":"valid code","status":"pass","usertype":usertype}}
    return funcresponse



def encryptText(text, key):
	cipher = ""
	k_indx = 0
	msg_len = float(len(text))
	msg_lst = list(text)
	key_lst = sorted(list(key))
	
	col = len(key)
	# calculate maximum row of the matrix
	row = int(math.ceil(msg_len / col))
	# add the padding character '_' in empty
	fill_null = int((row * col) - msg_len)
	msg_lst.extend('_' * fill_null)
	matrix = [msg_lst[i: i + col]
			for i in range(0, len(msg_lst), col)]
	
	for _ in range(col):
		curr_idx = key.index(key_lst[k_indx])
		cipher += ''.join([row[curr_idx]
						for row in matrix])
		k_indx += 1

	return cipher


