// components/CourseForm.tsx
import * as React from "react";
import { Modal } from "@fluentui/react/lib/Modal";
import { TextField } from "@fluentui/react/lib/TextField";
import { DatePicker } from "@fluentui/react/lib/DatePicker";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { Dropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { Stack } from "@fluentui/react/lib/Stack";
import { ICourse, ICourseFormData, IUser } from "../../types";

interface ICourseFormProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSubmit: (data: ICourseFormData) => void;
  initialData?: ICourse;
  users: IUser[];
}

const CourseForm: React.FC<ICourseFormProps> = ({
  isOpen,
  onDismiss,
  onSubmit,
  initialData,
  users,
}) => {
  const [formData, setFormData] = React.useState<ICourseFormData>({
    Title: "",
    Description: "",
    StartDate: new Date(),
    EndDate: new Date(),
    AssignedUsers: [],
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        Title: initialData.Title,
        Description: initialData.Description,
        StartDate: new Date(initialData.StartDate),
        EndDate: new Date(initialData.EndDate),
        AssignedUsers: initialData.AssignedUsers,
      });
    } else {
      setFormData({
        Title: "",
        Description: "",
        StartDate: new Date(),
        EndDate: new Date(),
        AssignedUsers: [],
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formData);
  };

  const userOptions: IDropdownOption[] = users.map((user) => ({
    key: user.Id,
    text: user.Title,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      titleAriaId="course-form-title"
      isBlocking={false}
    >
      <Stack tokens={{ padding: 20, childrenGap: 20 }}>
        <h2 id="course-form-title">
          {initialData ? "Edit Course" : "Add New Course"}
        </h2>
        <form onSubmit={handleSubmit}>
          <Stack tokens={{ childrenGap: 15 }}>
            <TextField
              label="Course Name"
              required
              value={formData.Title}
              onChange={(_, newValue) =>
                setFormData({ ...formData, Title: newValue || "" })
              }
            />

            <TextField
              label="Description"
              multiline
              rows={3}
              value={formData.Description}
              onChange={(_, newValue) =>
                setFormData({ ...formData, Description: newValue || "" })
              }
            />

            <DatePicker
              label="Start Date"
              value={formData.StartDate}
              onSelectDate={(date) =>
                setFormData({ ...formData, StartDate: date || new Date() })
              }
            />

            <DatePicker
              label="End Date"
              value={formData.EndDate}
              onSelectDate={(date) =>
                setFormData({ ...formData, EndDate: date || new Date() })
              }
            />

            <Dropdown
              label="Assigned Users"
              multiSelect
              options={userOptions}
              inputMode="text"
              selectedKeys={formData.AssignedUsers.map((user) => user.Id)}
              onChange={(_, item) => {
                if (item) {
                  setFormData({
                    ...formData,
                    AssignedUsers: item.selected
                      ? [
                          ...formData.AssignedUsers,
                          {
                            Id: item.key as number,
                            Title: item.text as string,
                          },
                        ]
                      : formData.AssignedUsers.filter(
                          (user) => user.Id !== item.key
                        ),
                  });
                }
              }}
            />

            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <PrimaryButton type="submit">
                {initialData ? "Update" : "Create"}
              </PrimaryButton>
              <DefaultButton onClick={onDismiss}>Cancel</DefaultButton>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
};

export default CourseForm;
