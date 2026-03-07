"use client";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { ChannelList } from "stream-chat-react";
import { ChannelFilters, ChannelSort } from "stream-chat";
import { useAuth } from "@/store/authStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth((state) => state);
  const filters: ChannelFilters = {
    members: { $in: [user?._id as string] },
    type: "messaging",
  };
  const options = { presence: true, state: true };
  const sort: ChannelSort = {
    last_message_at: -1,
  };
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {user?._id ? (
              <ChannelList filters={filters} sort={sort} options={options} />
            ) : (
              <div className="p-4 text-sm text-muted-foreground">
                Connecting...
              </div>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
