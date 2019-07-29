const { Pool } = require('pg');

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'RED',
    password: '12345',
    port: 5432 
})

pool.query("DROP TABLE redschema.items CASCADE ", (err, res) => {
    if(err){
        console.log("Whats my error", err)
    }else{
        console.log('items dropped')
        pool.query("DROP TABLE redschema.users CASCADE ", (err, res) => {
            if(err){
                console.log("Whats my error", err)
            }else{
                console.log('users dropped')

                pool.query("CREATE TABLE redschema.users (id SERIAL UNIQUE, name VARCHAR UNIQUE NOT NULL, password VARCHAR NOT NULL, location VARCHAR, date_of_birth DATE, status VARCHAR DEFAULT 'inactive', date_created TIMESTAMP DEFAULT NOW())", (err, res) => {
                    if(err){
                        console.log("Whats my error", err)
                    }else{
                        console.log('users ok')
                        pool.query("CREATE TABLE redschema.items (id SERIAL UNIQUE, name VARCHAR NOT NULL, description VARCHAR, quantity INTEGER DEFAULT 1, duration INTEGER DEFAULT 1, status VARCHAR DEFAULT 'available', owner_id INTEGER REFERENCES redschema.users (id) NOT NULL, borrower_id INTEGER REFERENCES redschema.users (id))", (err, res) => {
                            if(err){
                                console.log("Whats my error", err)
                            }else{
                                console.log('items ok');
                            }
                            process.exit();
                        })
                    }
                })


            }
        })        
    }
})




