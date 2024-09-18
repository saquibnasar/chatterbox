import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ChannelTypes = z.enum(["TEXT", "AUDIO", "VIDEO"]);
const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is a required",
    })
    .refine((name) => name !== "general", {
      message: "channel name cannot be 'general'",
    }),
  type: z.enum(["TEXT", "AUDIO", "VIDEO"]),
});
export default function CreateChannelModal() {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "createChannel";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "Text",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels`,
        query: {
          serverId: params.serverId,
        },
      });
      await axios.post(url, values);
      form.reset();
      router.refresh();
      onClose();
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Create Channel
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                          Channel Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            placeholder="Enter Channel name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                          Channel Type
                        </FormLabel>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                              <SelectValue placeholder="select a channel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(["TEXT", "AUDIO", "VIDEO"]).map(
                              (type) => (
                                <SelectItem
                                  key={type}
                                  value={type}
                                  defaultValue="TEXT"
                                  className="captalize"
                                >
                                  {type.toLowerCase()}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button type="submit" variant={"primary"} disabled={isLoading}>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
