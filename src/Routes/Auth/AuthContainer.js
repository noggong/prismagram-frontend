import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {

	const [action, setAction] = useState("logIn");
	const username = useInput("");
	const firstName = useInput("");
	const lastName = useInput("");
	const email = useInput("noggong@gmail.com");
	const [ requestSecretMutation ] = useMutation(LOG_IN, {
		variables: { email: email.value },

	});

	const [ createAccountMutation ] = useMutation(CREATE_ACCOUNT, {
		variables: {
			email: email.value,
			username: username.value,
			firstName: firstName.value,
			lastName: lastName.value
		}
	})

	const onSubmit = async(e) => {
		e.preventDefault();
		if (action === "logIn") {
			if (email !== "") {
				try {
					const { data: {requestSecret} } = await requestSecretMutation();
					if (!requestSecret) {
						toast.error("You don`t have an account yes, create one");
						setTimeout(() => setAction("signUp"), 3000);
					}
				} catch (error){
					console.log(error)
					toast.error("Can`t request secret, try again")
				}
			} else {
				toast.error("Email is required")
			}
		} else if (action === "signUp"){
			if (
				email.value !== "" &&
				username.value !== "" &&
				firstName.value !== "" &&
				lastName.valu!== ""
			) {
				try {
					const { data: {createAccount} } = await createAccountMutation();
					if (!createAccount) {
						toast.error("Can`t create account");
					} else {
						toast.success("Account created! Log In now");
						setTimeout(() => setAction("logIn"), 3000);
					}
				} catch (error) {
					toast.error(error.message);
				}
			}
		} else {
			toast.error("All field are required");
		}

	}

	return (<AuthPresenter
		action={action}
		setAction={setAction}
		username={username}
		firstName={firstName}
		lastName={lastName}
		email={email}
		onSubmit={onSubmit}
	/>)
}
