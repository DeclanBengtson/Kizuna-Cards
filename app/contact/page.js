import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex justify-center items-center">
      <div className="card w-full max-w-md shadow-lg bg-white">
        <div className="card-body">
          <h2 className="card-title text-center">Contact Us</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Your Name" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Your Email" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea className="textarea textarea-bordered" placeholder="Your Message"></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn w-full bg-black text-white">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
