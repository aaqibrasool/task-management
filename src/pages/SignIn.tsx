import { FC } from "react"
import { mockUsers } from "../data/user"
import { createArraysByProperty } from "../utils"
import { useStore } from "../context/store"

const SignIn: FC = () => {
  const alikeGroupUsers = createArraysByProperty(mockUsers, "group")
  const { login } = useStore()

  return (
    <div className="sign-in-container">
      <h1 className="title">Available Mock Users,</h1>
      <p className="instructions">
        Click on any of the below email address to login with that email id:
      </p>
      <ul className="user-list">
        {alikeGroupUsers.map((users, idx) => (
          <div key={idx} className="group-container">
            <h3 className="group-title">Group: {users[0].group}</h3>
            {users.map((user) => (
              <li
                key={user.id}
                className="user-item"
                onClick={() => login(user.id)}
              >
                {user.email}
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default SignIn
