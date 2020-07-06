**Fancy Todo**
----
> Fancy Todo List App

* **URL**

  > To get all the todo list <br />
  `/todos`

* **Method:**

  `GET`

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

  **Code:** 500 INTERNAL SERVER ERROR<br />
  **Content:** `{ msg }`

<br />

* **URL**

  > To add a todo list <br />
  `/todos/add`

* **Method:**

  `POST`

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