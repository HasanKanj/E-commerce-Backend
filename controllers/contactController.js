import Contact from '../models/contactModel.js';

export const createContact = async (req, res) => {
    try {
      console.log(req.body); // add this line to log the request body
      const { name, email, phoneNumber, message  } = req.body;
      if (!name || !email || !phoneNumber || !message ) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const newContact = await Contact.create({ name, email, phoneNumber, message  });
      console.log(newContact); // add this line to log the new contact
      res.status(201).json(newContact);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateContactById = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteContactById = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.contactId);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};