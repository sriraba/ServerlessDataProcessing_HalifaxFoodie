# Title: Cipher Key Generation
# Author: Sri Ramya Basam
# Date: 2022/11/09
# Availability: https://www.geeksforgeeks.org/columnar-transposition-cipher/

import json
import math
import boto3
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    
    print(event)
    request_json = json.loads(event['body'])
    
    print(request_json)
    cipherText = encryptText(request_json['plaintext'], request_json['key'])
    print(cipherText)
    client = boto3.resource("dynamodb")
    table = client.Table("userCipherInfo")
    table.put_item(
    Item={
      'username':request_json['username'],
      'plaintext':request_json['plaintext'],
      'key':request_json['key']
    }
	)
    return {
        'statusCode': 200,
        'body': json.dumps(cipherText)
    }


# Implementation of  Columnar Transposition Encryption
def encryptText(text, key):
	cipher = ""
	k_indx = 0
	msg_len = float(len(text))
	msg_lst = list(text)
	key_lst = sorted(list(key))
	
	col = len(key)	
	row = int(math.ceil(msg_len / col))	
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


