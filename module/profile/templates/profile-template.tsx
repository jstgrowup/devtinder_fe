"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/store/authStore";
import { EditProfileModal } from "../components/edit-profile";
import { useState } from "react";
import { useUpdateProfile } from "../hooks/useProfile";
import { EditProfileSchemaType } from "../utils/zod";
import { openErrorToast, openSuccessToast } from "@/components/common/toast";
import { useQueryClient } from "@tanstack/react-query";
import { CommonResponse } from "@/types";
import { IUser } from "@/module/auth/types";
const ProfileTemplate = () => {
  const user = useAuth((state) => state.user);
  const fullName = `${user?.firstName} ${user?.lastName ?? ""}`;
  const [openEditModal, setOpenEditModal] = useState(false);
  const { mutate: editProfile, isPending } = useUpdateProfile();
  const queryClient = useQueryClient();
  const { setUser } = useAuth((state) => state);
  const handleEditSubmit = (payload: EditProfileSchemaType) => {
    editProfile(payload, {
      onSuccess: async (response) => {
        openSuccessToast({ message: response.message });
        const updatedProfile: CommonResponse<IUser> =
          await queryClient.fetchQuery({
            queryKey: ["me"],
          });
        if (updatedProfile?.data) {
          setUser(updatedProfile.data);
        }
        setOpenEditModal(false);
      },
      onError: (error) => {
        openErrorToast({ error });
      },
    });
  };
  return (
    <>
      <EditProfileModal
        onSave={(updatedData) => {
          handleEditSubmit(updatedData);
        }}
        open={openEditModal}
        setOpen={setOpenEditModal}
        isLoading={isPending}
      />
      <div className="flex justify-center px-4 py-10">
        <Card className="w-full max-w-3xl shadow-lg rounded-2xl">
          <CardHeader className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.photoUrl} />
              <AvatarFallback>{user?.firstName}</AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="text-2xl font-semibold">
                {fullName}
              </CardTitle>
              <p className="text-muted-foreground text-sm">{user?.emailId}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenEditModal(true)}
              className="cursor-pointer"
            >
              Edit Profile
            </Button>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-6 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{user?.age ?? "N/A"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-medium capitalize">
                  {user?.gender ?? "N/A"}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground mb-2">About</p>
              <p className="text-sm leading-relaxed">{user?.about}</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground mb-3">Skills</p>

              <div className="flex flex-wrap gap-2">
                {user?.skills.length ? (
                  user?.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No skills added
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfileTemplate;
