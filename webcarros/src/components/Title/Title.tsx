interface TitleProps {
    primary?: boolean;
    secundary?: boolean;
    tertiary?: boolean;
    center?: boolean;
    title: string | number;
}

const Title = ({primary = false,secundary = false , title,center=false} : TitleProps) => {
  return (
    <h1 className={`${center && 'text-center'} ${secundary && 'text-2xl font-bold'} ${primary && 'text-3xl font-bold'}`}>
        {title}
    </h1>
  )
}
export default Title
