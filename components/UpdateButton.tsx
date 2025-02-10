import { Button } from "@mui/material";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";
import { userApi } from "../api/userApi";
import { updateUser } from "../store/actions";
import toast from "react-hot-toast";

interface Props {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  data: {
    name: string;
    email: string;
  };
}

export default function UpdateButton({ isEditing, setIsEditing, data }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async () => {
    const { email, name } = data;
    setIsLoading(true);
    try {
      await userApi.updateUser({ id: user.id, name, email });
      dispatch(updateUser({ name, email }));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(
        (error as any).response.data.message || "Failed to update your profile"
      );
      console.error("Failed to update user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleUpdateProfile}
      disabled={!isEditing || isLoading}
      fullWidth
    >
      {isLoading ? <Loader2 className="animate-spin" /> : "Update Profile"}
    </Button>
  );
}
