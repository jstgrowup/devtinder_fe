import { useState } from "react";

const defaultUser = {
  firstName: "Sarah",
  lastName: "Johnson",
  age: 26,
  gender: "Female",
  about:
    "Adventure seeker & coffee enthusiast. Love hiking, photography, and meeting new people. Always up for spontaneous road trips and trying new cuisines.",
  photoUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  skills: ["Photography", "Travel", "Hiking", "Coffee", "Design"],
  email: "sarah.johnson@email.com",
  location: "San Francisco, CA",
};

const ProfileTemplate = () => {
  const [user, setUser] = useState(defaultUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ ...defaultUser });
  const [newSkill, setNewSkill] = useState("");

  const openModal = () => {
    setEditData({ ...user });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewSkill("");
  };

  const handleSave = () => {
    setUser({ ...editData });
    closeModal();
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData({
        ...editData,
        skills: [...editData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditData({
      ...editData,
      skills: editData.skills.filter((s) => s !== skillToRemove),
    });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="card bg-base-100 shadow-2xl overflow-hidden">
          <div className="h-40 bg-linear-to-r from-primary via-secondary to-accent relative">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="flex items-end justify-between px-8 -mt-14">
            <div className="avatar">
              <div className="w-28 rounded-full ring-4 ring-base-100 shadow-xl">
                <img src={user.photoUrl} alt={user.firstName} />
              </div>
            </div>
            <button
              onClick={openModal}
              className="btn btn-primary btn-sm gap-2 shadow-md mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Profile
            </button>
          </div>

          <div className="card-body pt-4 px-8 pb-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
                <span className="text-base-content/40 text-2xl font-normal ml-2">
                  {user.age}
                </span>
              </h1>
              <div className="flex flex-wrap gap-3 mt-2 text-base-content/60 text-sm">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {user.gender}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {user.email}
                </span>
              </div>
            </div>

            <div className="divider my-2" />

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                About Me
              </h2>
              <p className="text-base-content/70 leading-relaxed">
                {user.about}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-secondary rounded-full inline-block" />
                Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="badge badge-outline badge-primary badge-lg py-3 px-4 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl">Edit Profile</h3>
              <button
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
                <div className="avatar">
                  <div className="w-16 rounded-full ring-2 ring-primary">
                    <img src={editData.photoUrl} alt="preview" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="label label-text font-medium">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    className="input input-bordered input-sm w-full"
                    value={editData.photoUrl}
                    onChange={(e) =>
                      setEditData({ ...editData, photoUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">First Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={editData.firstName}
                    onChange={(e) =>
                      setEditData({ ...editData, firstName: e.target.value })
                    }
                    placeholder="First name"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Last Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={editData.lastName}
                    onChange={(e) =>
                      setEditData({ ...editData, lastName: e.target.value })
                    }
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Age</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={editData.age}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        age: parseInt(e.target.value),
                      })
                    }
                    placeholder="Age"
                    min="18"
                    max="100"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Gender</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={editData.gender}
                    onChange={(e) =>
                      setEditData({ ...editData, gender: e.target.value })
                    }
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Location</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={editData.location}
                    onChange={(e) =>
                      setEditData({ ...editData, location: e.target.value })
                    }
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">About Me</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24 resize-none"
                  value={editData.about}
                  onChange={(e) =>
                    setEditData({ ...editData, about: e.target.value })
                  }
                  placeholder="Tell us about yourself..."
                  maxLength={300}
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/50">
                    {editData.about.length}/300
                  </span>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Interests</span>
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    className="input input-bordered flex-1 input-sm"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                    placeholder="Add an interest..."
                  />
                  <button
                    onClick={handleAddSkill}
                    className="btn btn-primary btn-sm"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="badge badge-outline badge-primary gap-1 py-3"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-error ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-action mt-8 flex gap-3">
              <button onClick={closeModal} className="btn btn-ghost flex-1">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn btn-primary flex-1 gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Changes
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeModal} />
        </div>
      )}
    </div>
  );
};

export default ProfileTemplate;
