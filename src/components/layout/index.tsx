import { ThemedHeaderV2, ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import { Header } from "@refinedev/antd";
const layout = ({children}:React.PropsWithChildren) => {
    return (
        <ThemedLayoutV2
        Header = {Header}
        Title={(titleProps)=> <ThemedTitleV2 {...titleProps} text="Refine"/>}
        >
        {children}
        </ThemedLayoutV2>
       
    )
}

export default layout;