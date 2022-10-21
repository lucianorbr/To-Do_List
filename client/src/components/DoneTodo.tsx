//done todo
import { useState } from "react";
import { useForm } from "@mantine/hooks";
import { Button, Modal, Group, TextInput, Textarea } from "@mantine/core";
import { ENDPOINT, Todo } from "../App";
import { KeyedMutator } from "swr";

function DoneTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  async function doneTodo(values: { title: string; body: string }) {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate(updated);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Done todo">
        <form onSubmit={form.onSubmit(doneTodo)}>
          <TextInput
            required
            mb={12}
            label="Todo"
            placeholder="What do you want to do?"
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label="Body"
            placeholder="Tell me more..."
            {...form.getInputProps("body")}
          />

          <Button type="submit">Done todo</Button>
        </form>
      </Modal>

      <Group position="center">
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          DONE TODO
        </Button>
      </Group>
    </>
  );
}

export default DoneTodo;