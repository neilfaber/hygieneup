import http.client
import json

import keys

# Signzy api
# https://docs.signzy.com/api-marketplace/fssai

conn = http.client.HTTPSConnection("api-preproduction.signzy.app")

headers = {
    # Set fssai api key in keys.py in variable fssai_api
    'Authorization': f'{keys.fssai_api}',
    'Content-Type': 'application/json'
}


def fssai_certifited(number):  # Function that validates is fssai number is valid
    payload = json.dumps({
        "licenseNumber": str(number),
        "getCategorizedProductList": "true"
    })
    conn.request("POST", "/api/v3/fssai/verification", payload, headers)
    res = conn.getresponse()
    data = res.read().decode("utf-8")
    if (data['result']['status'] == 'ACTIVE'):
        return True
    else:
        return False
