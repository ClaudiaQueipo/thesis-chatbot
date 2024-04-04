import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  useDisclosure
} from "@nextui-org/react";
import NavigationBar from "../../components/navigation-bar/NavigationBar";
import { PlusIcon } from "../../assets/Icons/PlusIcon";
import { BugIcon } from "../../assets/Icons/BugIcon";
import { SearchIcon } from "../../assets/Icons/SearchIcon";
import { columns, statusOptions } from "../../utils/data";
import { EditDoc } from "../../assets/Icons/EditDoc";
import { DeleteDoc } from "../../assets/Icons/DeleteDoc";
import useAssistantsStore from "../../store/assistantsListStore";
import useFetchAssistants from "../../hooks/useFetchAssistants";
import useAssistantStore from "../../store/assistantStore";
import { getUser } from "../../utils/auth";
import useAnswersStore from "../../store/answersStore";
import useQuestionsStore from "../../store/questionsStore";
import DeleteModal from "../../components/DeleteModal";

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "description",
  "knowledge",
  "createdAt",
  "actions",
];

const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";

function formatDate(dateString) {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };

  const date = new Date(dateString);
  return date.toLocaleString('es-ES', options).replace(/ de/g, '');
}


export default function App() {
  useFetchAssistants()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const assistants = useAssistantsStore(state => state.assistants)
  const [filterValue, setFilterValue] = React.useState("");
  const [assistantToDelete, setAssistantToDelete] = React.useState(null);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const setAnswers = useAnswersStore(state => state.setAnswers)
  const setQuestions = useQuestionsStore(state => state.setQuestions)

  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(assistants.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredAssistants = [...assistants];

    if (hasSearchFilter) {
      filteredAssistants = filteredAssistants.filter((assistant) =>
        Object.values(assistant)
          .join(" ")
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredAssistants = filteredAssistants.filter((assistant) =>
        Array.from(statusFilter).includes(assistant.status)
      );
    }

    return filteredAssistants;
  }, [assistants.length > 0, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((assistant, columnKey) => {
    const cellValue = assistant[columnKey];

    switch (columnKey) {
      case "name":
        return <p>{cellValue}</p>;
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "knowledge":
        return <Chip variant="faded">{cellValue}</Chip>;
      case "createdAt":

        return <p>{assistant["created_at"] ? formatDate(assistant["created_at"]) : ""}</p>;

      case "actions":
        return (
          <div className="flex justify-start items-center gap-2">
            <Button size="sm">
              <BugIcon className={iconClasses} />
            </Button>
            <Button as={Link} size="sm" to="/gestion-asistentes/edit-assistant">
              <EditDoc className={iconClasses} />
            </Button>
            <Button size="sm" onClick={() => onOpen()} >
              <DeleteDoc className={iconClasses} />
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex justify-between gap-3 items-end">
            <div>
              <Input
                isClearable
                size="md"
                placeholder="Buscar..."
                startContent={<SearchIcon className="text-default-300" />}
                value={filterValue}
                variant="flat"
                onClear={() => setFilterValue("")}
                onValueChange={onSearchChange}
              />
            </div>
            <div className="flex gap-3">
              <Button
                as={Link}
                to="/gestion-asistentes/create-assistant"
                className="bg-secondary text-white"
                endContent={<PlusIcon />}
                size="md"
              >
                Crear Asistente
              </Button>
            </div>
          </div>
          <br />
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {assistants.length} assistants
            </span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    assistants.length,
    hasSearchFilter,
  ]);


  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const setAssistantInput = useAssistantStore(state => state.setAssistant)
  
  useEffect(() => {
    const findAssistantById = (id) => {
      return assistants.find((assistant) => assistant._id === id);
    };

    if (selectedKeys.size > 0) {
      const selectedKeysArray = Array.from(selectedKeys);
      const firstSelectedKey = selectedKeysArray[0];
      const selectedAssistant = findAssistantById(firstSelectedKey);
      setAssistantInput({
        _id: selectedAssistant._id,
        name: selectedAssistant.name,
        description: selectedAssistant.description,
        knowledge: selectedAssistant.knowledge,
        questions: selectedAssistant.questions,
        answers: selectedAssistant.answers,
        username: getUser()
      })
      setAnswers(selectedAssistant.answers)
      setQuestions(selectedAssistant.questions)
      setAssistantToDelete(selectedAssistant)
    }
  }, [selectedKeys]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <div>
      <NavigationBar />
      <div style={{ margin: "50px" }}>
        <Table
          isCompact
          removeWrapper
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          checkboxesProps={{
            classNames: {
              wrapper:
                "after:bg-foreground after:text-background text-background",
            },
          }}
          //   classNames={classNames}
          selectedKeys={selectedKeys}
          selectionMode="single"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No tienes asistentes"} items={sortedItems}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell key={columnKey}>
                    {columnKey === "questions" || columnKey === "answers"
                      ? item.questions.map((q, index) => (
                        <div key={index}>
                          <strong>{`Q${index + 1}: `}</strong>
                          {q}
                        </div>
                      ))
                      : renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>

        </Table>
      </div>
      <DeleteModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
