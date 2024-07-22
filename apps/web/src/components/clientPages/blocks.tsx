"use client"
import {useEffect, useState} from "react";
import {BlockDetailsType, GatewayRes} from "../../utils/types.ts";
import gatewayClient from "../../network/gatewayClient.ts";
import {FlexGrid} from "@repo/ui/atoms";

export const Blocks = () => {
  const [blocks, setBlocks] = useState<BlockDetailsType[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBlock = async () => {
      try {
        setLoading(true);
        const { data } = await gatewayClient.get<GatewayRes<BlockDetailsType[]>>('blocks', {
          params: {
            limit: '10', // TODO: hardcoded params for now, implement with pagination
          },
        });
        console.log('data', data);
        if (data?.data) {
          setBlocks(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getBlock();
  }, []);

  return (
      <FlexGrid>
        <div/>
      </FlexGrid>
  );
}