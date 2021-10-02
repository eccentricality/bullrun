
function Button() {


    return (
        <>
            <div className="container margin-top" id="margin">

                <div className="col">

                    <div className="row">
                        <h5 className="boldUnderline">Account / Portfolio</h5>
                    </div>
                    <div className="row">
                        <button className="waves-effect grey lighten-2 btn font"><i
                            className="material-icons left">account_circle</i>Profile</button>
                    </div>
                    <div className="row">
                        <button className="waves-effect grey lighten-2 btn font"><i
                            className="material-icons left">business_center</i>Portfolio</button>
                    </div>
                    <div className="row">
                        <button className="waves-effect grey lighten-2 btn font"><i
                            className="material-icons left">account_balance</i>History</button>
                    </div>
                    <div className="row">
                        <button className="waves-effect grey lighten-2 btn font"><i
                            className="material-icons left">attach_money</i>Fortune 500</button>
                    </div>
                    <div className="row">
                        <button className="waves-effect grey lighten-2 btn font"><i
                            className="material-icons left">create_new_folder</i>Misc Stock Prices</button>
                    </div>

                    <div className="row">
                        <h5 className="boldUnderline margin-top">Blog / Resources</h5>
                    </div>
                    <div className="row">
                        <button className="waves-effect grey lighten-2 btn font"><i
                            className="material-icons left">arrow_upward</i>Trending Articles</button>
                    </div>
                    <div className="row">
                        <button className="waves-effect grey lighten-2 btn font"><i
                            className="material-icons left">comment</i>My Posts</button>
                    </div>
                    <div className="row">
                        <button className="waves-effect grey lighten-2 btn font"><i
                            className="material-icons left">link</i>Investment Resources</button>
                    </div>



                </div>

            </div>
        </>
    );
}

export default Button;