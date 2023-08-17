import UserRepository from "../../src/application/usecase/repository/userRepository";
import Login from "../../src/application/usecase/user/login";
import Signup from "../../src/application/usecase/signup";
import Verify from "../../src/application/usecase/verify";
import User from "../../src/domain/entity/user/user";

test("Deve verificar um token", async function () {
	const verify = new Verify();
	const payload = await verify.execute("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.nPHGoaoMLLpmDS61-njfqX6G5ZvwT3Y5U71uOXGbRYY");
	expect(payload.email).toBe("joao@gmail.com");
});
