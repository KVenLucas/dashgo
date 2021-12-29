import { useDisclosure } from '@chakra-ui/hooks';
import { UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect } from 'react';

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

export function SidebarDrawerProvider({
  children
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();

  const { asPath } = useRouter();

  useEffect(() => {
    disclosure.onClose();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
