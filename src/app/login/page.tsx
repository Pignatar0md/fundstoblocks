export default function Login() {
	return (
		<form action="/auth/signup">
			<label htmlFor="email">Email</label>
			<input name="email" title="Email" />
			<label htmlFor="password">Password</label>
			<input name="password" type="password" title="Password" />
			<button>Sign in</button>
		</form>
	);
}
