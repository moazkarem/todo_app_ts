import Button from "./ui/Button";
import { Itodo, axiosError } from "./interfaces/interfaces";
import UseAuthQuery from "../hooks/UseAuthQuery";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Textarea from "./ui/Textarea";
import axiosInstance from "./config/axios.config";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Skeleton from "./ui/Skeleton";
const TodoList = () => {
  const defaultObject: Itodo = {
    id: 0,
    title: "",
    discribtion: "",
  };
  const defaulAddTodo = {
    title: "",
    discribtion: "",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [queryVer, setqueryVer] = useState(1);
  const storageKey = "logged";
  const userStringdata = localStorage.getItem(storageKey);
  const userdata = userStringdata ? JSON.parse(userStringdata) : null;
  const [editData, seteditData] = useState<Itodo>(defaultObject);
  const [AddTodo, setAddTodo] = useState(defaulAddTodo);
  const [loading, setloading] = useState(false);
  const { data, isLoading } = UseAuthQuery({
    queryKey: ["todos", `${queryVer}`],
    url: "users/me?populate=todolists",
    config: {
      headers: {
        Authorization: `Bearer ${userdata.jwt}`,
      },
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }, (_, idx) => (
          <Skeleton key={idx} />
        ))}
      </div>
    );
  }
  /* =====MODAL HANDELER===== */
  const closeModal = () => {
    seteditData(defaultObject);
    setIsOpen(false);
  };

  const openModal = (todo: Itodo) => {
    seteditData(todo);
    setIsOpen(true);
  };

  const changeEditHandeler = (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = e.target;
    seteditData({
      ...editData,
      [name]: value,
    });
  };

  const onSubmitHandeler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    const { title, discribtion } = editData;
    try {
      const { status } = await axiosInstance.put(
        `todolists/${editData.id}`,
        { data: { title, discribtion } },
        {
          headers: { Authorization: `Bearer ${userdata.jwt}` },
        }
      );
      if (status === 200) {
        closeModal();
        setqueryVer((prev) => prev + 1);
        toast.success("Success Updated!", {
          duration: 1500,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      const errorObj = error as AxiosError<axiosError>;
      console.log(errorObj.response?.data.error.message);
    } finally {
      setloading(false);
    }
  };

  /* =====MODAL HANDELER DELETE===== */
  const closeModalDelete = () => {
    seteditData(defaultObject);
    setIsOpenDelete(false);
  };

  const openModalDelete = (todo: Itodo) => {
    setIsOpenDelete(true);
    seteditData(todo);
  };

  const onsubmitDeleteHandeler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { status } = await axiosInstance.delete(
        `/todolists/${editData.id}`,
        {
          headers: {
            Authorization: `Bearer ${userdata.jwt}`,
          },
        }
      );
      if (status === 200) {
        closeModalDelete();
        setqueryVer((prev) => prev + 1);
        toast.success("Success Deleted!", {
          duration: 1500,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* =====MODAL HANDELER ADD NEW TODO ===== */
  const changeAddHandeler = (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = e.target;
    setAddTodo({
      ...AddTodo,
      [name]: value,
    });
  };

  const closeModalAdd = () => {
    setAddTodo(defaulAddTodo);
    setIsOpenAdd(false);
  };

  const openModalAdd = () => {
    setIsOpenAdd(true);
  };

  const onAddSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    const { discribtion, title } = AddTodo;
    try {
      const { status } = await axiosInstance.post(
        "/todolists",
        { data: { title, discribtion, user: userdata.user.id } },
        {
          headers: { Authorization: `Bearer ${userdata.jwt}` },
        }
      );
      if (status === 200) {
        closeModalAdd();
        setqueryVer((prev) => prev + 1);
        toast.success("Success Added!", {
          duration: 1500,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="space-y-1 ">
      <div className="space-y-3 ">
        <div className="w-fit mx-auto my-10">
          <Button size={"sm"} onClick={openModalAdd}>
            Post New Todo
          </Button>
        </div>
      </div>
      {data.length ? (
        data.map((todo: Itodo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button onClick={() => openModal(todo)} size={"sm"}>
                Edit
              </Button>
              <Button
                onClick={() => openModalDelete(todo)}
                variant={"danger"}
                size={"sm"}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-indigo-800 text-2xl text-center font-bold">
          No Todos Yet !{" "}
        </h1>
      )}
      {/* // ================ EDIT MODAL =========== */}
      <Modal
        title="Edit todo"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <form onSubmit={onSubmitHandeler} className="space-y-3">
          <Input
            name="title"
            value={editData.title}
            onChange={changeEditHandeler}
          />
          <Textarea
            name="discribtion"
            value={editData.discribtion}
            onChange={changeEditHandeler}
          />
          <div className="flex items-center justify-center mt-4">
            <Button className="me-3" loading={loading}>
              update
            </Button>
            <Button type="button" variant={"cancel"} onClick={closeModal}>
              cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* // ================ DELETE MODAL =========== */}

      <Modal
        title="Remove todo"
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        closeModal={closeModalDelete}
      >
        <form onSubmit={onsubmitDeleteHandeler} className="space-y-3">
          <h1 className="font-bold">
            Are You Sure To Delete This Task ? {"   "}
          </h1>
          <p className="text-gray-500 text-lg">
            Deleting This Task will delete all the tasks associated with it . If
            you want to keep them , please move them to another task list .
          </p>
          <div className="flex items-center justify-center mt-4">
            <Button variant={"danger"} loading={loading} className="me-3">
              Remove
            </Button>
            <Button type="button" variant={"cancel"} onClick={closeModalDelete}>
              cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* // ================ ADD MODAL =========== */}
      <Modal
        title="Add New Todo"
        isOpen={isOpenAdd}
        setIsOpen={setIsOpenAdd}
        closeModal={closeModalAdd}
      >
        <form onSubmit={onAddSubmit} className="space-y-3">
          <Input
            name="title"
            value={AddTodo.title}
            onChange={changeAddHandeler}
          />
          <Textarea
            name="discribtion"
            value={AddTodo.discribtion}
            onChange={changeAddHandeler}
          />
          <div className="flex items-center justify-center mt-4">
            <Button className="me-3" loading={loading}>
              Add Todo
            </Button>
            <Button type="button" variant={"cancel"} onClick={closeModalAdd}>
              cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TodoList;
