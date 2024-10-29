const User = require('../models/users');

async function deleteUser(req, res,next) {
    try {
        const userId = req.params._id;
        let role = req.user.role;
        
        //only Admin can delete the user.
        if (role === 'Admin') {
            const deletedUser = await User.deleteOne({_id:userId});
            return res.status(201).json(deletedUser);
        }else{
            const error = {};
            error.status = 403;
            error.message = "Forbidden, don't have permission to delete user"
            return next(error);
        }
    }catch(error){
       return next(error);
    }
}
module.exports = {deleteUser};