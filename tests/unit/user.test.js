const {Users}=require('../../models/user');
const jwt = require('jsonwebtoken');
const config=require('config');
const mongoose=require('mongoose');
describe('user.generate.AuthToken',()=>
{
    it('should return a valid token',()=>
    {
        const payload={_id:new mongoose.Types.ObjectId().toHexString(), isAdmin:true }
            const user=new Users(payload)
            const token=user.generateAuthToken();
            const decoded=jwt.verify(token,config.get('SwathisApi'));
            console.log(decoded);
            console.log(payload);
            expect(decoded).toMatchObject(payload);
            expect(decoded).toHaveProperty('isAdmin',true);
            expect(decoded._id).not.toBeNull();
    })
})