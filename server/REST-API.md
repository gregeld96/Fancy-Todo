**Fancy Todo**
----
> Fancy Todo List App

* **URL**

  > To get all the todo list <br />
  `/todos`

* **Method:**

  `GET`

* **Request Header:**

  ```json
    {
      "token": < user token >
    }
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "todos": [
        {
          "id": [integer],
          "title": [string],
          "description": [string],
          "status": [string],
          "due_date": [date],
          "createdAt": [date],
          "updatedAt": [date]
        }
      ]
    }
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "token invalid!"
    }
    ```

    OR

  **Code:** 500 INTERNAL SERVER ERROR<br />
  **Content:** `{ msg }`

<br />

* **URL**

  > To add a todo list <br />
  `/todos/add`

* **Method:**

  `POST`

* **Request Header:**

  ```json
    {
      "token": < user token >
    }
    ```

* **Data Params**

  **Required:**
 
   `name = [string]`<br />
   `description = [string]`<br />
   `status = [string]`<br />
   `due_date = [string]`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "todos": [
        {
          "id": [integer],
          "title": [string],
          "description": [string],
          "status": [string],
          "due_date": [date],
          "createdAt": [date],
          "updatedAt": [date]
        }
      ]
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Title cannot be empty,Description cannot be empty,Status cannot be empty,Must be in date format,Date cannot be empty"
    }

    OR

    {
      "msg": "token invalid!"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  >To get specific todo list by id <br />
  `/todos/:id`

* **Method:**

  `GET`

*  **URL Params** 

   **Required:**
 
   `id=[integer]`

* **Request Header:**

  ```json
    {
      "token": < user token >
    }
    ```
  
* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "todos": [
        {
          "id": [integer],
          "title": [string],
          "description": [string],
          "status": [string],
          "due_date": [date],
          "createdAt": [date],
          "updatedAt": [date]
        }
      ]
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "token invalid!"
    }
    ```
  OR

  * **Code:** 403 Forbidden<br />
    **Content:**
    ```json
      {
        "msg": "You are not Authorized!"
      }
    ```

    OR

  * **Code:** 404 Not Found<br />
    **Content:**
    ```json
      {
        "msg": "Data not found"
      }
    ```

<br />

* **URL**

  >To update the specific todo list <br />
  `/todos/:id`

* **Method:**

  `PUT`

*  **URL Params** 

   **Required:**
 
   `id=[integer]`

* **Request Header:**

  ```json
    {
      "token": < user token >
    }
    ```

* **Data Params**

  **Required:**
 
   `name = [string]`<br />
   `description = [string]`<br />
   `status = [string]`<br />
   `due_date = [string]`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "todo": {
        "title": "Bersihin Laptop",
        "description": "Ganti hardware",
        "status": "on-going",
        "due_date": "2020-07-07"
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Title cannot be empty,Description cannot be empty,Status cannot be empty,Must be in date format,Date cannot be empty"
    }

    OR

    {
      "msg": "token invalid!"
    }
    ```

  OR

  * **Code:** 403 Forbidden<br />
    **Content:**
    ```json
      {
        "msg": "You are not Authorized!"
      }
    ```

  OR
  
  * **Code:** 404 Not Found<br />
    **Content:**
    ```json
      {
        "msg": "Data not found"
      }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  >To delete the specific todo list <br />
  `/todos/:id`

* **Method:**

  `DELETE`

*  **URL Params** 

   **Required:**
 
   `id=[integer]`

* **Request Header:**

  ```json
    {
      "token": < user token >
    }
    ```

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "todo": {
        "id": [integer],
        "title": [string],
        "description": [string],
        "status": [string],
        "due_date": [date],
        "createdAt": [date],
        "updatedAt": [date]
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "token invalid!"
      }
    ```
    
  * **Code:** 403 Forbidden<br />
    **Content:**
    ```json
      {
        "msg": "You are not Authorized!"
      }
    ```

  OR

  * **Code:** 404 Not Found<br />
    **Content:**
    ```json
      {
        "msg": "Data not found"
      }
    ```
  
  OR
  
  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  >To Login into the app <br />
  `/login`

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `email = [string]`<br />
   `password = [string]`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "msg": "[login.name] successfully logined!",
      "token": [string]
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "email and password required for login"
      }
    ```
    OR
    ```json
      {
        "msg": "Username or Password Invalid"
      }
    ```

<br />

* **URL**

  >To register a user <br />
  `/register`

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `name = [string]`<br />
   `email = [string]`<br />
   `password = [string]`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "name": [register.name],
      "msg": "[register.name] successfully registered!"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "name cannot be empty,Use the right email format,Password cannot be empty"
      }
    ```

<br />

* **URL**

  >To find a random activity <br />
  `/boredom/activity`

* **Method:**

  `GET`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "activity": {
        "activity": "Listen to your favorite album",
        "type": "music",
        "participants": 1,
        "price": 0.08,
        "link": "",
        "key": "3136729",
        "accessibility": 0.2
      }
    }
    ```
 
* **Error Response:**

  **Code:** 500 INTERNAL SERVER ERROR<br />
  **Content:** `{ msg }`

<br />

* **URL**

  >To find a random activity based on type <br />
  `/boredom/activity/:type`

* **Method:**

  `GET`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "activity": {
        "activity": "Listen to your favorite album",
        "type": "music",
        "participants": 1,
        "price": 0.08,
        "link": "",
        "key": "3136729",
        "accessibility": 0.2
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 404 Not Found<br />
    **Content:**
    ```json
      {
        "msg": "No activity found with the specified parameters"
      }
    ```
  
  OR

  **Code:** 500 INTERNAL SERVER ERROR<br />
  **Content:** `{ msg }`