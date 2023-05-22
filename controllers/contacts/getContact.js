const { basedir } = global;
const Contacts = require(`${basedir}/models/contacts`);

const getContact = async (req, res) => {
  const contact = await Contacts.findById(req.params.contactId);
  if (contact) {
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not found" });
};

module.exports = getContact;
