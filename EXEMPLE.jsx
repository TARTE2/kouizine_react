import { useState, useEffect } from "react";
import Dexie from "dexie";

function App() {
    const [contacts, setContacts] = useState([]);
    const [form, setForm] = useState({ nom: "", email: "", age: "" });

    const db = new Dexie("ContactsDB");
    db.version(1).stores({contacts: "++id, nom, email, age"});

    // Charger les contacts depuis localStorage
    useEffect(() => {
        chargerContacts();
    }, []);

    const chargerContacts = () => {
        //const contactsData = JSON.parse(localStorage.getItem("contacts")) || [];
        db.contacts.toArray().then((contactsData) => {
            setContacts(contactsData);
        }).catch((err) => {
            console.error(err.stack || err);
        });
    };

    // Sauvegarder les contacts dans localStorage
    const sauvegarderContact = (contact) => {
        db.contacts.add(contact).then((id) => {
            console.log(`Contact ajouté avec l'ID ${id}`);
            chargerContacts();
        }).catch((err) => {
            console.error(err.stack || err);
        });
    };

    // Gestion des changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Ajouter un contact
    const ajouterContact = (e) => {
        e.preventDefault();
        if (form.nom && form.email && form.age) {
            const newContact = { ...form, age: parseInt(form.age), id: Date.now() };
            sauvegarderContact(newContact);
            setForm({ nom: "", email: "", age: "" });
        }
    };

    // Supprimer un contact
    const supprimerContact = (id) => {
        //const updatedContacts = contacts.filter((contact) => contact.id !== id);

        //sauvegarderContacts(updatedContacts);
        db.contacts.delete(id).then(() => {
            console.log(`Contact avec l'ID ${id} supprimé`);
            chargerContacts();
        })
    };

    // Mettre à jour un contact
    const mettreAJourContact = (id) => {
        const newNom = prompt("Nom:");
        const newEmail = prompt("Email:");
        const newAge = prompt("Âge:");
        if (newNom && newEmail && newAge) {
            const updatedContact = { nom: newNom, email: newEmail, age: parseInt(newAge), id };

            db.contacts.update(id, updatedContact).then(() => {
                console.log(`Contact avec l'ID ${id} mis à jour`);
                chargerContacts();
            }).catch((err) => {
                console.error(err.stack || err);
            });
        }
    };

    return (
            <div className="App">
                <h1>Gestion des Contacts</h1>

                {/* Formulaire d'ajout de contact */}
                <form onSubmit={ajouterContact}>
                    <input
                            type="text"
                            name="nom"
                            placeholder="Nom"
                            value={form.nom}
                            onChange={handleChange}
                    />
                    <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                    />
                    <input
                            type="number"
                            name="age"
                            placeholder="Âge"
                            value={form.age}
                            onChange={handleChange}
                    />
                    <button type="submit">Ajouter</button>
                </form>

                {/* Liste des contacts */}
                <h2>Liste des Contacts</h2>
                <ul>
                    {contacts.map((contact) => (
                            <li key={contact.id}>
                                <strong>{contact.nom}</strong> ({contact.email}) - {contact.age} ans
                                <button onClick={() => supprimerContact(contact.id)}>
                                    Supprimer
                                </button>
                                <button onClick={() => mettreAJourContact(contact.id)}>
                                    Mettre à jour
                                </button>
                            </li>
                    ))}
                </ul>
            </div>
    );
}

export default App;

