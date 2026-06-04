import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getProfile
} from "../services/profile.service";

const ProfilePage = () => {

  const [profile, setProfile] =
    useState<any>();

  useEffect(() => {

    const load =
      async () => {

        const data =
          await getProfile();

        setProfile(data);
      };

    load();

  }, []);

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <div className="mt-6">

          <p>
            Username:
            {" "}
            {profile?.username}
          </p>

          <p>
            Role:
            {" "}
            {profile?.role}
          </p>

          <p>
            Created:
            {" "}
            {
              profile?.createdAt
            }
          </p>

        </div>

      </div>
    </>
  );

};

export default ProfilePage;