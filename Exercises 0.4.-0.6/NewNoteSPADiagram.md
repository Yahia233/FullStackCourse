sequenceDiagram
    participant browser
    participant server

    Note over browser: User save the new note
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: Server  saves it
    server-->>browser: 201 Created (with JSON response containing the new note)
    deactivate server

    Note right of browser: Browser updates the note list dynamically without reloading the page
    browser->>browser: Update the note list with the new note
