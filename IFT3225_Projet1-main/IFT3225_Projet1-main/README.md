Pour pouvoir tester le projet avec MAMP:
    1. MAMP -> MAMP/Preferences/Server ->
        Document root = C:\...\IFT3225_Projet1\public_html
    2. Aller sur "localhost" dans un fureteur pour acceder à l'accueil

Base de données: (login: root//root)
    Table 1: accounts
        account_id (PK)
        account_name
        account_passwd
        account_reg_time

    Table 2: tiles
        tile_id (PK)
        title
        tile_date
        category
        description
        account_id (FK)