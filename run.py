import uvicorn
IP_ADDRESS = "192.168.1.101"
if __name__ == '__main__':
    uvicorn.run("app:app", host=IP_ADDRESS, port=8000, reload=True)
    