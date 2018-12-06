import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const GET_USERS_AND_POSTS = gql`
    {
        users {
            id,
            name
        },
        posts {
            id,
            title,
            content,
        }
    }
`;

const UserList = ({users}) => (
    <ul>
        {users.map(user => {
            return(
                <li key={user.id}>
                    {user.name}
                </li>
            )
        })}
    </ul>
);

const Users = () => (
    <Query query={GET_USERS_AND_POSTS}>
        {({ loading, error, data }) => {
            if (loading || !data) {
                return <div>Loading ...</div>;
            }

            return (
                <UserList users={data.users} />
            );
        }}
    </Query>
);

export default Users;
