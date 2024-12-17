import asyncHandler from  "express-async-handler"

const getAllContacts = asyncHandler((req,res) => {
    res.status(200).json(`This is the all contact get API response`);
});
const getContactById = asyncHandler((req,res) => {
    res.status(200).json(`This is the contact record ID ${req.params.id} from get API response`);
});
const addNewContact = asyncHandler((req,res) => {
    res.status(200).json(`This is adding new contact using POST method`);
});
const updateContact = asyncHandler((req, res)=>{
    res.status(200).json(`This is updating existing contact API`);
});

export {getAllContacts, getContactById, addNewContact, updateContact};