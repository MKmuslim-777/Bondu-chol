import React from "react";
import { toast } from "react-toastify";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target;
    const name = form.name.value;
    const number = form.number.value;
    const fatherName = form.fatherName.value;
    const photo = form.photo.value;
    const propation = form.propation.value;
    const email = form.email.value;
    const password = form.password.value;
    
    const readyForPost = {name, number, fatherName, propation, email, password, photo}

    // console.log({name, number, fatherName, propation, email, password, photo});
    
    
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify(readyForPost)
    })
    .then(res => res.json())
    .then(data => {
      console.log("From the client site:", data);
      if(data.insertedId){
        toast.success("কাম তো সাইরা পালাইছস বেটা")
        form.reset()
      }
    })
  }

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">ফর্মটা পুরণ কর</h1>
            <p className="py-6">
              এখানে তোমার আর তোমার আব্বু আম্মুর সব তথ্য গুলো দিতে হবে বুঝছো?
              <input
                type="checkbox"
                className="checkbox checkbox-accent ml-3"
              />
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">


              <form onSubmit={handleSubmit} className="fieldset">
                {/* Name */}
                <label className="label">তোমার নাম লিখ</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  required
                  placeholder="তোমার নাম লিখ"
                />

                {/* Phone */}
                <label className="label">তোমার মোবাইল নাম্বার দাও</label>
                <input
                  type="number"
                  className="input"
                  name="number"
                  required
                  placeholder="তোমার মোবাইল নাম্বার দাও"
                />

                {/* PhotoURL */}
                <label className="label">তোমার একটা ছবির লিংক দাও</label>
                <input
                  type="text"
                  className="input"
                  name="photo"
                  required
                  placeholder="তোমার একটা ছবির লিংক দাও"
                />

                {/* Father Name */}
                <label className="label">তোমার আব্বুর নাম লেখ</label>
                <input
                  type="text"
                  className="input"
                  name="fatherName"
                  required
                  placeholder="তোমার আব্বুর নাম লেখ"
                />

                {/* propation */}
                <label className="label">তুমি কি কর?</label>
                <input
                  type="text"
                  className="input"
                  name="propation"
                  required
                  placeholder="তুমি কি কর?"
                />


                {/* Email */}
                <label className="label">তোমার একটা ইমেল দাও</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  required
                  placeholder="তোমার একটা ইমেল দাও"
                />

                {/* Password */}
                <label className="label">একটা পাসওয়ার্ড দাও তো</label>
                <input
                  type="password"
                  className="input"
                  placeholder="একটা পাসওয়ার্ড দাও তো"
                  name="password"
                  required
                />
                {/* <div>
                  <a className="link link-hover">Forgot password?</a>
                </div> */}
                <button className="btn btn-neutral mt-4">সাবমিট কর</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
