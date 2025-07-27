export const MilestoneFilters = () => {
  return (
    <div>
      <select name="status" id="">
        <option value="">Pending </option>
        <option value="">Completed </option>
      </select>
      <select name="priority" id="">
        <option value="Low"> Low </option>
        <option value="Medium"> Medium </option>
        <option value="High"> High </option>
      </select>
    </div>
  );
};
