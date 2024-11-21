// components/CourseList.tsx
import * as React from "react";
import {
  DetailsList,
  IColumn,
  SelectionMode,
  Selection,
  ISelection,
  IObjectWithKey,
} from "@fluentui/react/lib/DetailsList";
import {
  CommandBar,
  ICommandBarItemProps,
} from "@fluentui/react/lib/CommandBar";
import { ICourse } from "../../types";
import { format } from "date-fns";
import { MarqueeSelection } from "@fluentui/react";

interface ICourseListProps {
  courses: ICourse[];
  onEdit: (course: ICourse) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

const CourseList: React.FC<ICourseListProps> = ({
  courses,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const columns: IColumn[] = [
    {
      key: "title",
      name: "Course Name",
      fieldName: "Title",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "description",
      name: "Description",
      fieldName: "Description",
      minWidth: 200,
      maxWidth: 300,
    },
    {
      key: "startDate",
      name: "Start Date",
      fieldName: "StartDate",
      minWidth: 100,
      maxWidth: 150,
      onRender: (item: ICourse) =>
        format(new Date(item.StartDate), "MM/dd/yyyy"),
    },
    {
      key: "endDate",
      name: "End Date",
      fieldName: "EndDate",
      minWidth: 100,
      maxWidth: 150,
      onRender: (item: ICourse) => format(new Date(item.EndDate), "MM/dd/yyyy"),
    },
    {
      key: "assignedUsers",
      name: "Assigned Users",
      fieldName: "AssignedUsers",
      minWidth: 200,
      maxWidth: 300,
      onRender: (item: ICourse) =>
        item.AssignedUsers.map((user) => user.Title).join(", "),
    },
  ];

  const [selectedItems, setSelectedItems] = React.useState<IObjectWithKey>();
  const selection = React.useMemo(
    () =>
      new Selection({
        onSelectionChanged: () => {
          //console.log('handle selection change',selection.getSelection())
          setSelectedItems(selection.getSelection()[0]);
        },
        selectionMode: SelectionMode.single,
      }),
    []
  );
  const [commandBarItems, setCommandBarItems] = React.useState<
    ICommandBarItemProps[]
  >([]);

  const commandBarItemsWhileNotSelected: ICommandBarItemProps[] = [
    {
      key: "addCourse",
      text: "Add Course",
      iconProps: { iconName: "Add" },
      onClick: onAdd,
    },
  ];
  const commandBarItemsWhileSelected: ICommandBarItemProps[] = [
    {
      key: "addCourse",
      text: "Add Course",
      iconProps: { iconName: "Add" },
      onClick: onAdd,
    },
    {
      key: "deleteCourse",
      text: "Delete Course",
      iconProps: { iconName: "Delete" },
      onClick: () => onDelete((selectedItems as ICourse)?.Id),
    },
  ];

  const onItemInvoked = (item: ICourse): void => {
    onEdit(item);
  };

  React.useEffect(() => {
    // Do something with the selected item
    if (selectedItems) {
      setCommandBarItems(commandBarItemsWhileSelected);
    } else {
      setCommandBarItems(commandBarItemsWhileNotSelected);
    }
  }, [selectedItems]);

  return (
    <div>
      <CommandBar items={commandBarItems} />
      <MarqueeSelection selection={selection}>
        <DetailsList
          items={courses}
          columns={columns}
          selection={selection}
          selectionPreservedOnEmptyClick={true}
          selectionMode={SelectionMode.single}
          onItemInvoked={onItemInvoked}
        />
      </MarqueeSelection>
    </div>
  );
};

export default CourseList;
