const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app= express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "asaph"
});
app.use(cors())
app.use(express.json());

app.get('/command', (req, res) =>{
    const sql = "SELECT * FROM commande";
    db.query(sql, (err, data) =>{
        if(err) return res.json("erreur de connection");
        return res.json(data);
    })
})
app.post('/singup', (req, res) =>{
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const tel = req.body.tel;
    const quartier= req.body.quartier;
    const date = req.body.date;
    const degre_d = req.body.degre_d;
    const metre_d = req.body.metre_d;
    const verre_d = req.body.verre_d;
    const degre_g = req.body.degre_g;
    const metre_g = req.body.metre_g;
    const verre_g = req.body.verre_g;
    const prix_m = req.body.prix_m;
    const prix_av = req.body.prix_av;

    
    db.query(
        "INSERT INTO `commande`( `nom`, `prenom`, `tel`, `quartier`, `date`, `degre_d`, `metre_d`, `verre_d`, `degre_g`, `metre_g`, `verre_g`, `prix_m`, `prix_av`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [nom, prenom, tel, quartier, date, 
            degre_d, metre_d, verre_d, degre_g, metre_g, verre_g, prix_m, prix_av],
        (err, resultat) => {
            if(err){
                console.log(err);
            }else{
                res.send('impossible insereles donnees');
            }        }
    )

})

app.delete('/delete/:id', (req, res) =>{
    const id = req.params.id;
    const sql = "DELETE FROM commande WHERE id = ? ";
    
    db.query(sql, [id], (err, data) =>{
        if(err){
            return res.json("Error");
        }else{
           return res.json(data);
        }
    })
        
        
})

app.listen(8081, () =>{
    console.log('connected....');
})