# MongoDB Atlas Connection Setup

## Your Connection String

Your MongoDB Atlas connection string is:
```
mongodb+srv://gajabaProj:<db_password>@cluster0.4nsfsfa.mongodb.net/?appName=Cluster0
```

## Setup Instructions

1. **Open `server/.env` file** (create it if it doesn't exist)

2. **Replace `<db_password>` with your actual MongoDB Atlas password**

3. **Add the database name `arunaprinters` to the connection string**

4. **Your final connection string should look like:**
```
MONGODB_URI=mongodb+srv://gajabaProj:YOUR_ACTUAL_PASSWORD@cluster0.4nsfsfa.mongodb.net/arunaprinters?retryWrites=true&w=majority
```

## Example .env file:

```
MONGODB_URI=mongodb+srv://gajabaProj:yourpassword123@cluster0.4nsfsfa.mongodb.net/arunaprinters?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

## Important Notes:

- Replace `YOUR_ACTUAL_PASSWORD` with your real MongoDB Atlas database password
- Make sure your IP address is whitelisted in MongoDB Atlas (Network Access)
- The database name `arunaprinters` will be created automatically if it doesn't exist
- Never commit the `.env` file to git (it's already in .gitignore)

## Test the Connection:

After setting up the `.env` file, run:
```bash
npm run server
```

You should see: `✅ Connected to MongoDB`

