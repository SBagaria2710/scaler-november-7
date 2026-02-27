import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserMiddleware } from "./userMiddleware";

const param = 4;
function User() {
    const { loading, error, user } = useSelector((store) => store.userState);

    const dispatch = useDispatch();

    useEffect(() => {
        if (param != null) {
            dispatch(fetchUserMiddleware(param));
        }
    }, [param]);

    const heading = <h2>User Example</h2>

    if (loading) {
        return (
            <div>
                {heading}
                <h3>Loading...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                {heading}
                <h3>Error occured!</h3>
            </div>
        );
    }

    return (
        <div>
            {heading}
            <h4>Name: {user.name}</h4>
            <h4>Phone: {user.phone}</h4>
        </div>
    );
}

export default User;