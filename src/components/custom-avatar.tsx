import { getNameInitials } from '@/utilities/get-name-initials';
import {Avatar as AntdAvatar} from 'antd';
import { AvatarProps } from 'antd/lib';
type Props = AvatarProps & {
  name?: string;

}
const Customavatar = ({name, style, ...rest}: Props) => {
  return (
  <AntdAvatar
  alt={name}
  size= 'small'
  style={{
    backgroundColor:'#87d0068',
    display:'flex',
    alignItems:'center',
    border:'none',
    ...style

  }}
  {...rest}
  >
    {getNameInitials(name||'')}
  </AntdAvatar>
  );
}

export default Customavatar