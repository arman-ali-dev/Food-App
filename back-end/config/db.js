const { connect } = require( "mongoose" )

const connectDB = async ( URI ) =>
{
    const connection = await connect( URI )
    return connection
}

module.exports = connectDB