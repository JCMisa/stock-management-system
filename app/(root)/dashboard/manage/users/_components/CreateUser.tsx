import React, { useActionState, useState } from "react";
import { LoaderCircle, PlusCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { Separator } from "@/components/ui/separator";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { createUserInfo } from "@/lib/actions/user";
import { toast } from "sonner";
import LoaderDialog from "@/components/custom/LoaderDialog";

const CreateUser = () => {
  const [gender, setGender] = useState<string>("male");
  const [role, setRole] = useState<string>("guest");

  const handleSubmit = async (prevState: unknown, formData: FormData) => {
    try {
      const formField = {
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        email: formData.get("email") as string,
        dateOfBirth: formData.get("dateOfBirth") as string,
        age: formData.get("age") as string,
        contact: formData.get("contact") as string,
        address: formData.get("address") as string,
        bio: formData.get("bio") as string,
        gender,
        role,
      };

      const result = await createUserInfo(
        prevState,
        uuidv4(),
        formField,
        "/empty-img.png",
        moment().format("MM-DD-YYYY")
      );

      if (result?.data !== null) {
        toast(
          <p className="font-bold text-sm text-green-500">
            User created successfully
          </p>
        );
      }

      return result?.data;
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Failed to create the user
        </p>
      );
      console.log("Add user info error: ", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, uploading] = useActionState(
    handleSubmit,
    undefined
  );

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" /> Add User
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-[80%] overflow-auto card-scroll">
          <AlertDialogHeader>
            <AlertDialogTitle>Create New User</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
              Create new user and assign necessary infomation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <Separator />
            <form action={formAction} className="flex flex-col gap-5">
              {/* personal info */}
              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-dark dark:text-white">
                    Personal Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Use a permanent address where you can receive mail.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center gap-4 w-full mt-6">
                    <div className="w-full">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-[#76828D]"
                        >
                          First name
                        </label>
                        <div className="mt-1">
                          <Input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Enter your first name"
                            className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-[#76828D]"
                      >
                        Last name
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          name="lastname"
                          id="lastname"
                          placeholder="Enter your last name"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 w-full mt-6">
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#76828D]"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email address"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-[#76828D] mb-2">
                        Date Of Birth
                      </label>
                      <Input
                        type="text"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        placeholder="e.g. February-11-2004"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 w-full mt-6">
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#76828D]"
                      >
                        Age
                      </label>
                      <div className="mt-1">
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          placeholder="Enter age here"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-[#76828D] mb-2">
                        Gender
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setGender(value ? value : "male")
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"male"}>Male</SelectItem>
                          <SelectItem value={"female"}>Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* contact info */}
              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-dark dark:text-white">
                    Contact Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Use a permanent contact and address where you can be
                    contacted.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-4 w-full mt-6">
                  <div className="w-full">
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium text-[#76828D]"
                    >
                      Contact
                    </label>
                    <div className="mt-1">
                      <Input
                        id="contact"
                        name="contact"
                        type="text"
                        placeholder="Enter your contact number"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-[#76828D]"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Enter you complete address"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* manage user bio */}
              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-dark dark:text-white">
                    Manage Bio
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Provide short and simple bio that best describes you.
                  </p>
                </div>
                <div className="w-full mt-6">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-[#76828D]"
                  >
                    Bio
                  </label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={5}
                    placeholder="Tell me more about yourself"
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <Separator />

              {/* manage role for admin access only */}
              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-dark dark:text-white">
                    Manage Role
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage the user&apos;s role and let them access necessary
                    features.
                  </p>
                </div>

                <div className="w-full mt-6">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-[#76828D]"
                  >
                    User Role
                  </label>
                  <div className="mt-1">
                    <Select
                      onValueChange={(value) =>
                        setRole(value ? value : "guest")
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"admin"}>Admin</SelectItem>
                        <SelectItem value={"doctor"}>Doctor</SelectItem>
                        <SelectItem value={"receptionist"}>
                          Receptionist
                        </SelectItem>
                        <SelectItem value={"pharmacist"}>Pharmacist</SelectItem>
                        <SelectItem value={"guest"}>Guest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <AlertDialogFooter className="mt-5">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit">
                  {uploading ? (
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </AlertDialogFooter>
            </form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <LoaderDialog loading={uploading} />
    </>
  );
};

export default CreateUser;
