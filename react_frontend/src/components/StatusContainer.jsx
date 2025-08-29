function StatusContainer({data }) {
    const { status, statusId } = data;
    return (
        <>
            <div className={`w-20 btn btn-${statusId? 'error' : 'success'} btn-sm text-white`}>{status}</div>
        </>
    )
}

export default StatusContainer

