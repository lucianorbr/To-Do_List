import { useState } from "react";
import { useForm } from "@mantine/hooks";
import { Button, Modal, Group, TextInput, Textarea } from "@mantine/core";
import { ENDPOINT, Todo } from "../App";
import { KeyedMutator } from "swr";

function DeleteTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  async function deleteTodo(values: { title: string; body: string }) {
    const deleted = await fetch(`${ENDPOINT}/api/todos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate(deleted);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Delete todo">
        <form onSubmit={form.onSubmit(deleteTodo)}>



        </form>
      </Modal>

      <Group position="center">
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          DELETE TODO
        </Button>
      </Group>
    </>
  );
}

export default DeleteTodo;
