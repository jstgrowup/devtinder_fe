import React from "react";
import { IUser } from "@/module/auth/types";

const UserCard: React.FC<IUser> = ({
  firstName,
  photoUrl,
  lastName,
  about,
  age,
  gender,
}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={photoUrl} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{age + "," + gender}</p>
        <p>{about}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
