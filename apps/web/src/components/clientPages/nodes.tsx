'use client';
import { FlexGrid } from '@repo/ui/atoms';
import { SectionHeader, TableContainer } from '@repo/ui/organisms';
import { nodesTableHead } from '../../utils/helpers/tableHeaders';
import { createNodesRows } from '../../utils/helpers/helper.tsx';
import { useState, useEffect } from 'react';
import { callGetNodes } from '../../utils/api/apiCalls.tsx';
import { NodeType } from '../../utils/types.ts';

export const Nodes = () => {
  const [loading, setLoading] = useState(false);
  const [nodes, setNodes] = useState<NodeType[]>([]);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        setLoading(true);
        const data = await callGetNodes();
        setNodes(data.data);
      } catch (error) {
        console.error('Error fetching nodes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNodes();
  }, []);

  const rows = createNodesRows(nodes, loading);

  return (
    <FlexGrid className="w-full gap-9 desktop:gap-12 mx-auto mb-12" direction={'col'}>
      <SectionHeader count={nodes.length} title={'Nodes'} />
      <TableContainer headCols={nodesTableHead} keyPrefix={'transactions'} rows={rows} />
    </FlexGrid>
  );
};
